// scripts/filterCoverage.js
const fs = require("fs");
const path = require("path");

// Path to Jest's coverage JSON output
const COVERAGE_FILE = path.resolve("coverage/coverage-final.json");

// Read coverage JSON
const coverageData = JSON.parse(fs.readFileSync(COVERAGE_FILE, "utf8"));

const paths = Object.entries(coverageData).map((x) => {
    x = x[1];
    x.path = x.path.split("Zoes-Boring-Idle-Game\\src\\")[1];
    return x
})

const pct = (executed, total) => { return (total === 0 ? 100 : (executed / total) * 100).toFixed(2) }

let stats = paths.map((x) => {
    const sIds = Object.keys(x.statementMap);
    const fIds = Object.keys(x.fnMap);
    const bIds = Object.keys(x.b);

    return {
        path: x.path.split("\\"),
        totState: sIds.length,
        totStateExec: sIds.filter(id => x.s[id] > 0).length,
        totFunc: fIds.length,
        totFuncExec: fIds.filter(id => x.f[id] > 0).length,
        totbranch: +(bIds.length > 0 ? bIds.reduce((sum, y) => +sum + x.b[y].length) : 0),
        totBranchExec: +(bIds.length > 0 ? bIds.reduce((sum, y) => +sum + x.b[y].filter(c => c > 0).length) : 0)
    }

})

const sorting = (a, b) => {
    const comp = a[0].localeCompare(b[0])
    if (comp == 0) return sorting(a.slice(1), b.slice(1));
    return comp;
}

stats = stats.sort((a, b) => { return sorting(a.path, b.path) })

function buildTree(stats) {
    const root = [];

    stats.forEach(stat => {
        const parts = stat.path; // already an array of path segments
        let currentLevel = root;

        parts.forEach((part, index) => {
            // Find existing node
            let existingNode = currentLevel.find(node => node.name === part);

            if (!existingNode) {
                // Create a new node with zeroed totals
                existingNode = {
                    name: part,
                    totState: 0,
                    totStateExec: 0,
                    totFunc: 0,
                    totFuncExec: 0,
                    totbranch: 0,
                    totBranchExec: 0
                };
                currentLevel.push(existingNode);
            }

            // Aggregate totals at this node
            existingNode.totState += stat.totState;
            existingNode.totStateExec += stat.totStateExec;
            existingNode.totFunc += stat.totFunc;
            existingNode.totFuncExec += stat.totFuncExec;
            existingNode.totbranch += stat.totbranch;
            existingNode.totBranchExec += stat.totBranchExec;

            // Move to children for the next segment
            if (index < parts.length - 1) {
                if (!existingNode.children) {
                    existingNode.children = [];
                }
                currentLevel = existingNode.children;
            }
        });
    });

    return root;
}

function printTree(nodes, indent = "") {
    nodes.forEach(node => {
        // Print current node with totals
        console.log(`${indent}- ${node.name}`);

        // Recursively print children, if any
        if (node.children) {
            printTree(node.children, indent + "    "); // increase indent for children
        }
    });
}

function buildAndPrintStatsTable(tree) {
    const table = [];
    const headers = ["File", "% Stmts", "% Branch", "% Funcs", "% Lines"]; // Removed "Uncovered Line #s"

    // ANSI color codes
    const reset = "\x1b[0m";
    const bright = "\x1b[1m";
    const fgGreen = "\x1b[32m";
    const fgYellow = "\x1b[33m";
    const fgRed = "\x1b[31m";
    const fgCyan = "\x1b[36m";

    function colorPercent(value) {
        const num = parseFloat(value);
        if (num === 100) return fgGreen + value + reset;
        if (num >= 50) return fgYellow + value + reset;
        return fgRed + value + reset;
    }

    function colorFile(name, isFolder) {
        return isFolder ? fgYellow + bright + name + reset : fgGreen + name + reset;
    }

    // Strip ANSI codes to measure real length
    const stripAnsi = str => str.replace(/\x1b\[[0-9;]*m/g, "");

    function traverse(node, depth = 0) {
        const indentedName = "  ".repeat(depth) + node.name;
        const isFolder = !!node.children;

        const percentStmts = node.totState ? ((node.totStateExec / node.totState) * 100).toFixed(2) : "100";
        const percentBranch = node.totbranch ? ((node.totBranchExec / node.totbranch) * 100).toFixed(2) : "100";
        const percentFuncs = node.totFunc ? ((node.totFuncExec / node.totFunc) * 100).toFixed(2) : "100";
        const percentLines = node.totState ? ((node.totStateExec / node.totState) * 100).toFixed(2) : "100";

        if (indentedName == "App.js") {console.log(node.totbranch)}

        // Only push if not all percentages are 100%
        if (!(+percentStmts === 100 && +percentBranch === 100 && +percentFuncs === 100 && +percentLines === 100)) {
            table.push({
                File: indentedName,
                "% Stmts": percentStmts,
                "% Branch": percentBranch,
                "% Funcs": percentFuncs,
                "% Lines": percentLines,
                _isFolder: isFolder
            });
        }

        if (node.children) {
            node.children.forEach(child => traverse(child, depth + 1));
        }
    }

    tree.forEach(node => traverse(node));

    // Calculate column widths without color codes
    const colWidths = headers.map(h => h.length);
    table.forEach(row => {
        headers.forEach((h, i) => {
            const val = stripAnsi(String(row[h]));
            colWidths[i] = Math.max(colWidths[i], val.length);
        });
    });

    const padRight = (str, len) => str + " ".repeat(Math.max(0, len - stripAnsi(str).length));
    const padLeft = (str, len) => " ".repeat(Math.max(0, len - stripAnsi(str).length)) + str;

    // Print header
    const headerLine = headers.map((h, i) => padRight(fgCyan + bright + h + reset, colWidths[i])).join(" | ");
    const separator = colWidths.map(w => "-".repeat(w)).join("-+-");
    console.log(headerLine);
    console.log(separator);

    // Print rows with color
    table.forEach(row => {
        const line = [
            padRight(colorFile(row.File, row._isFolder), colWidths[0]),
            padLeft(colorPercent(row["% Stmts"]), colWidths[1]),
            padLeft(colorPercent(row["% Branch"]), colWidths[2]),
            padLeft(colorPercent(row["% Funcs"]), colWidths[3]),
            padRight(colorPercent(row["% Lines"]), colWidths[4]),
        ].join(" | ");
        console.log(line);
    });
}






buildAndPrintStatsTable(buildTree(stats))