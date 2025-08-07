pipeline {
  agent { 
	  node {
      label 'ec2-integrations-prod-11'
	  }
  }

  environment {
    IMAGE_NAME = "oca-frontend"
	  IMAGE_REPO_NAME = "${IMAGE_NAME}:${env.BUILD_NUMBER}"
	  IMAGE_FULL_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_NAME}:${env.BUILD_NUMBER}"
	  REGISTRY_CREDENTIAL = 'AWS_ECR'
	  AWS_SECRET_NAME = '/oca/tiendanube/front/prod/env'
  }

  stages {
		stage('Logging into AWS ECR') {
			steps {
				script {
					sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
				}
			}
		}

		stage('Building image') {
			steps{
				script {
					def secretValue = sh(script: "aws ssm get-parameter --name ${AWS_SECRET_NAME} --with-decryption --query 'Parameter.Value' --output text", returnStdout: true).trim()
					writeFile file: 'secret_file.txt', text: secretValue
					sh "docker build --build-arg SECRET_FILE=secret_file.txt -t ${IMAGE_REPO_NAME} . --no-cache"
				}
			}
 		}

    stage('Pushing to ECR') {
			steps{ 
				script {
					sh "docker tag ${IMAGE_REPO_NAME} ${IMAGE_FULL_NAME}"
					sh "docker push ${IMAGE_FULL_NAME}"
				}
			}
		}

    stage('Deploy Services in EC2') {
      steps {
        script{
          sh "sed -i 's#\\IMAGE_URI#${IMAGE_FULL_NAME}#g' docker-compose.yml"
          sh "docker stack deploy --with-registry-auth --prune --compose-file docker-compose.yml ${IMAGE_NAME}"
        }                    
      }    
    }
	}   
  post {
		success {
      slackSend channel: '#notifications-jenkins', color: '#6495ed', message: "Success: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    }

    failure {
      slackSend channel: '#notifications-jenkins', color: '#ff0000', message: "Failure: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    }

  }

}