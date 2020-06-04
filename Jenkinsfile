
pipeline {
    agent {
        docker { image 'node:7-alpin' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
