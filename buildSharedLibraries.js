const { spawn } = require('child_process')

const handleProcess = (child) => {
  return new Promise((resolve, reject) => {
    child.on('exit', (status) => {
      if (status != null && status !== 0) {
        reject()
      } else if (status != null) {
        resolve()
      }
    })
    child.on('error', reject)
  })
}

const spawnShell = (commandString) => {
  const spawnedProcess = spawn(commandString, {shell: true, detached: true})
  spawnedProcess.stdout.pipe(process.stdout)
  spawnedProcess.stderr.pipe(process.stderr)
  return handleProcess(spawnedProcess)
};

spawnShell(`
  cd add-driver/self-service
  yarn run build
`).then(() => {
  Promise.all([
  spawnShell(`
    cd add-driver/add-driver-form
    yarn run build
  `),
  spawnShell(`
    cd add-driver/self-service-stubs
    yarn run build
  `),
  spawnShell(`
    cd add-driver/self-service-remote
    yarn run build
  `),
    ]).then(() => {
      console.log('Finished building shared libraries')
  })
});
