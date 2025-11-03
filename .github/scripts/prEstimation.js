const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    try {
        const token = process.env.GITHUB_TOKEN;
        const { context } = github;
        const { pull_request: pr } = context.payload;

        if (!pr) {
            core.info("No pull request context found. Exiting.");
            return;
        }

        const octokit = github.getOctokit(token);

        // Fetch commits in the pull request
        const commits = await octokit.paginate(
            octokit.rest.pulls.listCommits,
            {
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: pr.number,
            }
        );

        const messages = commits.map(c => c.commit.message);
        core.info(`Found ${messages.length} commit messages`);

        // Analyze messages
        const warnings = [];
        for (const msg of messages) {
            if (/feat/i.test(msg)) {
                warnings.push("⚠️ Found a commit marked as 'WIP'. Consider squashing or cleaning up.");
            }
            if (/fix/i.test(msg)) {
                warnings.push("🔧 Detected a 'fix' commit — ensure it's linked to an issue.");
            }
        }

        const body = [
            "### 🕵️ Commit Analysis Report",
            ...warnings.map(w => `- ${w}`),
        ].join("\n");

        await octokit.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: pr.number,
            body,
        });

        core.info("Comment posted on PR.");
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
