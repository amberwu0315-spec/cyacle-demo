import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const errors = [];
const warnings = [];

const rootDir = process.cwd();
const testCasesDir = path.resolve(rootDir, 'docs/qa/test-cases');
const legacyDir = path.resolve(rootDir, 'docs/qa/_legacy_test-cases');
const samplesDir = path.resolve(rootDir, 'docs/qa/test-cases-samples');
const systemDir = path.resolve(rootDir, 'docs/system');

const REQUIRED_SYSTEM_FILES = [
    'rules.md',
    'regression-triggers.md',
    'regression-matrix-template.md'
];

const REQUIRED_ENTRY_FILES = ['README.md', 'DEPRECATED.md'];

const readDirEntries = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        return null;
    }
    return fs.readdirSync(dirPath, { withFileTypes: true });
};

const entryFiles = readDirEntries(testCasesDir);
if (!entryFiles) {
    errors.push(`missing directory: ${path.relative(rootDir, testCasesDir)}`);
} else {
    const allowed = new Set(REQUIRED_ENTRY_FILES);
    const missing = REQUIRED_ENTRY_FILES.filter(
        (name) => !entryFiles.some((entry) => entry.isFile() && entry.name === name)
    );
    if (missing.length > 0) {
        errors.push(`test-cases entry directory missing files: ${missing.join(', ')}`);
    }

    const extraFiles = entryFiles
        .filter((entry) => entry.isFile() && !allowed.has(entry.name))
        .map((entry) => entry.name);
    if (extraFiles.length > 0) {
        errors.push(`test-cases entry directory has extra files: ${extraFiles.join(', ')}`);
    }

    const subDirs = entryFiles
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
    if (subDirs.length > 0) {
        errors.push(`test-cases entry directory has subdirectories: ${subDirs.join(', ')}`);
    }
}

const legacyEntries = readDirEntries(legacyDir);
if (!legacyEntries) {
    errors.push(`missing legacy directory: ${path.relative(rootDir, legacyDir)}`);
} else {
    const tcCount = legacyEntries.filter(
        (entry) => entry.isFile() && /^TC-.*\.md$/i.test(entry.name)
    ).length;
    if (tcCount === 0) {
        warnings.push('legacy directory has no TC files; check whether cleanup already happened');
    }
}

const sampleEntries = readDirEntries(samplesDir);
if (!sampleEntries) {
    errors.push(`missing samples directory: ${path.relative(rootDir, samplesDir)}`);
} else {
    const sampleTcCount = sampleEntries.filter(
        (entry) => entry.isFile() && /^TC-.*\.md$/i.test(entry.name)
    ).length;
    if (sampleTcCount < 5) {
        warnings.push(`samples directory has only ${sampleTcCount} TC files (recommended >= 5)`);
    }
}

const systemEntries = readDirEntries(systemDir);
if (!systemEntries) {
    errors.push(`missing system directory: ${path.relative(rootDir, systemDir)}`);
} else {
    const systemFileSet = new Set(systemEntries.filter((entry) => entry.isFile()).map((entry) => entry.name));
    const missingSystemFiles = REQUIRED_SYSTEM_FILES.filter((name) => !systemFileSet.has(name));
    if (missingSystemFiles.length > 0) {
        errors.push(`system directory missing files: ${missingSystemFiles.join(', ')}`);
    }
}

if (warnings.length > 0) {
    warnings.forEach((msg) => console.warn(`[check:qa-freeze] warn: ${msg}`));
}

if (errors.length > 0) {
    errors.forEach((msg) => console.error(`[check:qa-freeze] error: ${msg}`));
    process.exit(1);
}

console.log('[check:qa-freeze] ok: qa freeze structure verified');
