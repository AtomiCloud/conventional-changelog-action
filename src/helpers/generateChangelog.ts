import * as fs from 'fs'
import conventionalChangelog from 'conventional-changelog'

const convertConfig = require('conventional-changelog-conventionalcommits');


function getChangelogStream(tagPrefix: string, preset: string, version: string, releaseCount: string, cfg: any) {
    const config = cfg == null ? convertConfig(cfg) : null
    return conventionalChangelog({
            preset,
            releaseCount: parseInt(releaseCount, 10),
            tagPrefix,
            config,
        },
        {
            version,
            currentTag: `${tagPrefix}${version}`,
        } as any,
        {},
        config && config.parserOpts,
        config && config.writerOpts
    )
}


function generateStringChangelog(tagPrefix: string, preset: string, version: string, releaseCount: string, config: any): Promise<string> {
    return new Promise((resolve) => {
        const changelogStream = getChangelogStream(tagPrefix, preset, version, releaseCount, config)
        
        let changelog = ''
        
        changelogStream
            .on('data', (data) => {
                changelog += data.toString()
            })
            .on('end', () => resolve(changelog))
    })
}

function generateFileChangelog(tagPrefix: string, preset: string, version: string, fileName: string, releaseCount: string, config: any): Promise<void> {
    return new Promise((resolve) => {
        const changelogStream = getChangelogStream(tagPrefix, preset, version, releaseCount, config)
        changelogStream
            .pipe(fs.createWriteStream(fileName))
            .on('finish', resolve)
    })
}

export {generateFileChangelog, generateStringChangelog}
