
#!/usr/bin/env groovy

 pipeline {
     agent any
     environment {
        registry = "registry.hyneo.ru/microhostst-site"
        registryCredential = "nexusadmin"
        dockerImage = ''
     }

     stages {
         stage('Build') {
             steps {
              script {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
             }
         }
         stage('Push registry nexus'){
             steps{
                 script{
                     docker.withRegistry('https://registry.hyneo.ru', registryCredential ) {
                         dockerImage.push()
                         dockerImage.push('latest')
                     }
                 }
             }
        }
        stage ('Deploy') {
            steps{
                sshagent(credentials : ['microhost']) {
                sh '''
                    [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                    ssh-keyscan -t rsa,dsa -p 22 185.200.243.214 >> ~/.ssh/known_hosts
                    ssh -p 22 root@185.200.243.214 'cd ./site && docker compose pull site && docker compose down site && docker compose up -d site'
                    '''
                }
            }
        }
        stage('Dangling Images') {
            steps {
                sh 'docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi'
            }
        }
     }
}