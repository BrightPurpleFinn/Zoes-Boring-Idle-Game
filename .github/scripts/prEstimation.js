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
        let versions = [0, 0, 0];
        for (const msg of messages) {
            if (/fix/i.test(msg)) {
                versions[2] += 1
            }
            if (/feat/i.test(msg)) {
                versions[1] += 1
            }
            if (/major/i.test(msg)) {
                versions[0] += 1
            }
        }

        // Fetch the most recent tag (by creation order)
        const { data: tags } = await octokit.rest.repos.listTags({
            owner: context.repo.owner,
            repo: context.repo.repo,
            per_page: 1, // just get the latest
        });

        let latestTag = null;
        if (tags.length > 0) {
            latestTag = tags[0].name;
            core.info(`Latest tag found: ${latestTag}`);
        } else {
            core.info("No tags found in this repository.");
        }

        // Remove the "v" prefix (optional)
        const cleanTag = latestTag.startsWith("v") ? latestTag.slice(1) : latestTag;

        // Split by dots
        let parts = cleanTag.split(".");

        versions = versions.map(Number);
        parts = parts.map(Number);

        let version = ""
        if (versions[0] != 0) {
            version = `v${versions[0] + parts[0]}.0.0`;
        } else if (versions[1] != 0) {
            version = `v${parts[0]}.${versions[1] + parts[1]}.0`;
        } else {
            version = `v${parts[0]}.${parts[1]}.${versions[2] + parts[2]}`;
        }

        const body = `### New version: ${version}`

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
