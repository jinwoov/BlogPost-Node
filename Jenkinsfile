node { // build on any node
    def commit_id // variable commit id

    stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id" // shell to get the commit id and put it on file
        commit_id = readFile('.git/commit-id').trim() // this will then store it to the variable
    }

    stage('docker build/push') {
        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            def app = docker.build("jinwoov/nodejs-tester:${commit_id}", '.').push()
        }
    }
}