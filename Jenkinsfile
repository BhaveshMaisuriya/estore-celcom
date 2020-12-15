pipeline {
		 agent {
				 label 'estore_node'
	  }
       options { timestamps () }
		stages{
		 stage('Unit Test') {
		 when { anyOf { branch 'develop'; branch 'release/*';  branch 'feature/*'; branch 'hotfix/*'} }
            steps {
                   script{
                     catchError {	
                     timeout(time: 60, unit: "MINUTES") {  
                     echo "Need Approval for initiating the UNIT TEST"
                     performSITDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed UNIT TEST', name: 'Yes')])
                if(performSITDeployment){
                echo "Approved build"
                    echo "Initiating Unit Testing"
                                   sh '''
                                   sed -i -e "s/sonar.projectVersion.*/sonar.projectVersion=`pwd | awk -F '/' '{ print $5 }'`/g" sonar-project.properties
                                   sudo rm -rf node_modules && npm install && npm run test-coverage-dev
                                   '''
                       			   echo "Unit Testing Completed"
                    
                }else{
                	echo 'Skipping - Build & Deploy to Testing'
                }
             }
          }
 			 echo currentBuild.result
                     
              }
            }
        }
        
		 stage('sonar-scaning') {
		    when { anyOf { branch 'hotfix/*';  branch 'develop'; branch 'release/*' ; branch 'feature/*'} }
            steps {
                   script{
                     catchError {
                    
                    echo "Initiating Static Code Review"
            				withSonarQubeEnv('SonarQube'){
													sh '''
                                                     /opt/sonar/sonar-scanner/bin/sonar-scanner -X
                                                    '''
							}
                      }
 			 echo currentBuild.result

                }
            }
        }			
       /*    stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    
                    waitForQualityGate abortPipeline: true
                }
            }
        }  */
          
			stage('Deployment on DEV-Estore-01') {
		    when { anyOf { branch 'feature/*'; branch 'release/*';  branch 'develop' } }
            steps {
                   script{
                     catchError {
                     timeout(time: 30, unit: "MINUTES") {
                    
                     echo "Need Approval for initiating the DEV build"
                     performSITDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow",
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in DEV', name: 'Yes')])
                if(performSITDeployment){
               echo "Approved build"
                    sh '/opt/estore/dev/angular/estore_angular_dev_packaging.sh'
                    echo "Deploying the Dev environment"
                    sh '/opt/estore/dev/angular/estore_angular_ssh_deployment.sh'
                    echo "Deployed the build"
                }else{
                	echo 'Skipping - Build & Deploy to Testing'
                }
             }
          }         
 			 echo currentBuild.result

              }
            }
        }
          stage('Deployment on DEV-GTM-Estore-12') {
		    when { anyOf { branch 'feature/*'; branch 'release/*';  branch 'develop' } }
            steps {
                   script{
                     catchError {
                     timeout(time: 30, unit: "MINUTES") {
                    
                     echo "Need Approval for initiating the DEV build"
                     performSITDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow",
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in DEV', name: 'Yes')])
                if(performSITDeployment){
               echo "Approved build"
                    sh '/opt/estore/dev_gtm/angular/estore_angular_dev_packaging.sh'
                    echo "Deploying the Dev environment"
                    sh '/opt/estore/dev_gtm/angular/estore_angular_ssh_deployment.sh'
                    echo "Deployed the build"
                }else{
                	echo 'Skipping - Build & Deploy to Testing'
                }
             }
          }         
 			 echo currentBuild.result

              }
            }
        }
					
        stage('Deployment on SIT-Estore-02') {
		 when { anyOf { branch 'develop'; branch 'release/*'; branch 'feature/*'; branch 'hotfix/*'} }
            steps {
                   script{
                     catchError {	
                     timeout(time: 30, unit: "MINUTES") {  
                     echo "Need Approval for initiating the Testing build"
                     performSITDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in SIT', name: 'Yes')])
                if(performSITDeployment){
               echo "Approved build"
                    sh '/opt/estore/sit/angular/estore_angular_sit_packaging.sh'
                    echo "Deploying the tar file into Server"
                    sh '/opt/estore/sit/angular/estore_angular_ssh_deployment.sh'
                    echo "Deployed the build"
                }else{
                	echo 'Skipping - Build & Deploy to Testing'
                }
             }
          }
 			 echo currentBuild.result
                     
              }
            }
        }
          stage('Deployment on SIT-GTM-Estore-22') {
		 when { anyOf { branch 'develop'; branch 'release/*'; branch 'feature/*'; branch 'hotfix/*'} }
            steps {
                   script{
                     catchError {	
                     timeout(time: 30, unit: "MINUTES") {  
                     echo "Need Approval for initiating the Testing build"
                     performSITDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in SIT', name: 'Yes')])
                if(performSITDeployment){
               echo "Approved build"
                    sh '/opt/estore/sit_gtm/angular/estore_angular_sit_packaging.sh'
                    echo "Deploying the tar file into Server"
                    sh '/opt/estore/sit_gtm/angular/estore_angular_ssh_deployment.sh'
                    echo "Deployed the build"
                }else{
                	echo 'Skipping - Build & Deploy to Testing'
                }
             }
          }
 			 echo currentBuild.result
                     
              }
            }
        }
        stage('Deployment on SIT2-Estore-04') {
		 when { anyOf { branch 'develop'; branch 'release/*';  branch 'hotfix/*'} }
            steps {
                   script{
                     catchError {	
                     timeout(time: 30, unit: "MINUTES") {  
                     echo "Need Approval for initiating the Testing build"
                     performSITDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in SIT2-Estore-04', name: 'Yes')])
                if(performSITDeployment){
               echo "Approved build"
                    sh '/opt/estore/sit2/angular/estore_angular_sit2_packaging.sh'
                    echo "Deploying the tar file into Server"
                    sh '/opt/estore/sit2/angular/estore_angular_ssh_deployment.sh'
                    echo "Deployed the build"
                }else{
                	echo 'Skipping - Build & Deploy to Testing'
                }
             }
          }  
 			 echo currentBuild.result
                     
              }
            }
        }
          stage('Deployment on SIT2-GTM-Estore-42') {
		 when { anyOf { branch 'develop'; branch 'release/*';  branch 'hotfix/*'} }
            steps {
                   script{
                     catchError {	
                     timeout(time: 30, unit: "MINUTES") {  
                     echo "Need Approval for initiating the Testing build"
                     performSITDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in SIT2-Estore-04', name: 'Yes')])
                if(performSITDeployment){
               echo "Approved build"
                    sh '/opt/estore/sit2_gtm/angular/estore_angular_sit2_packaging.sh'
                    echo "Deploying the tar file into Server"
                    sh '/opt/estore/sit2_gtm/angular/estore_angular_ssh_deployment.sh'
                    echo "Deployed the build"
                }else{
                	echo 'Skipping - Build & Deploy to Testing'
                }
             }
          }  
 			 echo currentBuild.result
                     
              }
            }
        }
        stage('Deployment on UAT-Estore-03') {
            when { anyOf {branch 'hotfix/*';branch 'release/*'} }
           steps {
               script{
                  catchError {
                     timeout(time: 30, unit: "MINUTES") {
                     echo "Need Approval for initiating the UAT build"
                     performUATDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in UAT', name: 'Yes')])
                	 if(performUATDeployment){             
                  						echo "Approved build & started packagingging"
              							sh '/opt/estore/preprod/angular/estore_angular_preprod_packaging.sh'

                    					echo "parsed tar file to base image VM "
                    					sh '/opt/estore/preprod/angular/estore_angular_ssh_deployment.sh'
										echo " imaging and rolling update"
										sh '/opt/estore/preprod/angular/estore_angular_preprod_rolling_update.sh'
                						echo "Deployed the build"
                						}else{
                                		echo'Skipping - Build & Deploy to UAT'
                						}
                     		}
                  }
 							echo currentBuild.result

                	}
          
        		}
        }
		stage('Functional Testing') {
            when { anyOf {  branch 'feature/*';  branch 'develop'; branch 'realease/*';  branch 'hotfix/*'}}
            steps {
               script{
                 catchError {
                     timeout(time: 5, unit: "MINUTES") {
                     echo "Need Approval for initiating Funtional Testing"
                     performFT = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Funtional Testing', name: 'Yes')])
                if(performFT){
                node('ft_node') { 
              	 bat '''call C:
				call cd C:\\CelcomProject\\Drop3\\workspace\\Celcom_Automation
				call 
				java -cp Drop3.jar;C:\\CelcomProject\\Drop3\\workspace\\Celcom_Automation\\Drop3_lib\\*;. cbf.harness.Main -configfilepath C:\\CelcomProject\\Drop3\\workspace\\Celcom_Automation\\Projects\\celcomPOC\\Plan\\ExcelConfig.xml -testsetfile TestSet.xls  -testsetsheet TestSet -browser CHROME
                call cd\\
				call C:
				call cd C:\\CelcomProject\\Drop3\\workspace\\Celcom_Automation\\src
				javac ConsolidatedReportDrop3.java
				java -cp . ConsolidatedReportDrop3
               call C:
                '''
              //echo "Loading Artifacts"
              //archiveArtifacts artifacts:'C:\\jenkins_slave\\workspace\\ReportPath_drop3\\TestSet.html', fingerprint: true
			      echo "Functional Testing Completed"
              }
                }else{
                	echo 'Skipping - FT'
                
                }
              }
           }
 			 echo currentBuild.result
               }
            }
        }

         stage('Performance Testing') {
            when { anyOf {branch 'hotfix/*';branch 'realease/*';} }
            steps {
               echo "Need approval to Performance Testing" 
               script{
                 catchError {
                         timeout(time: 5, unit: "MINUTES") {
                         performTesting = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                         parameters: [booleanParam(defaultValue: false, description: 'Select Yes for executing Performance testing', name: 'Yes')])

                    if(performTesting){
                      node('pt_node') { 
                      echo "Executing PT"
                  
                       bat ''' 
		                       call C:\\PerformanceTesting\\apache-jmeter-3.3\\bin\\jmeter.bat -Jjmeter.save.saveservice.output_format=xml -n -t  C:\\PerformanceTesting\\Drop3Estore\\Drop3\\Scenario\\SC01_EStore_LoadTest_125Users_5TPS.jmx -l SC01_EStore_LoadTest_125Users_5TPS.jtl'''
                          archiveArtifacts artifacts:'SC01_EStore_LoadTest_125Users_5TPS.jtl', fingerprint: true
                          perfReport modeEvaluation: true, percentiles: '0,50,90,100', sourceDataFiles: 'SC01_EStore_LoadTest_125Users_5TPS.jtl' 
                          perfReport constraints: [absolute(escalationLevel: 'INFORMATION', meteredValue: 'AVERAGE', operator: 'NOT_GREATER', relatedPerfReport: 'SC01_EStore_LoadTest_125Users_5TPS.jtl', success: false, value: 0), relative(escalationLevel: 'INFORMATION', meteredValue: 'AVERAGE', operator: 'NOT_GREATER', previousResultsBlock: previous(previousResultsString: '34', value: 'true'), relatedPerfReport: 'SC01_EStore_LoadTest_125Users_5TPS.jtl', success: false, tolerance: 0.0)], modeEvaluation: true, percentiles: '0,50,90,100', sourceDataFiles: '**\\*.jtl'
                          step([$class: 'ArtifactArchiver', artifacts: 'SC01_EStore_LoadTest_125Users_5TPS.jtl'])
               				 }
                    }else{
                                   echo "Skipping PT"
                                }
                             }
                             echo currentBuild.result
                      }
               }
                        echo "Performance Testing Completed"           
                }
        }
        
        stage('Deployment on Production') {
            when { anyOf {branch 'hotfix/*'; branch 'release/*'} }
            steps {
                //echo "Need approval to Deploy"
              script{
                 catchError {
                            timeout(time: 100, unit: "MINUTES") {
                     		echo "Need Approval for initiating Production build"
                     		performPRODDeployment = input(id: 'userInput', message: "Click on Proceed to Continue or Abort to terminate the flow", 
                     		parameters: [booleanParam(defaultValue: false, description: 'Select Yes to proceed Deployment in Production', name: 'Yes')])
                			if(performPRODDeployment){
                								      echo "Approved build"
                                                      sh '/opt/estore/prod/angular/estore_angular_prod.sh'
                                                      echo "Deploying the tar file into Server"
                                                      sh '/opt/estore/prod/angular/estore_angular_prod_rolling_update.sh'
                                                      echo "Deployed the build"
                                                      }else {
                                                      		echo 'Skipping - Build & Deploy To Production'
                                                      }
                   		   }
                 }
 						   echo currentBuild.result
                   }
       			 }
				}
		}

  post {
        always {
            echo 'One way or another, I have finished'
            //deleteDir() /* clean up our workspace */
           // emailext recipientProviders: [requestor(), brokenBuildSuspects()], subject: 'Jenkins Portal Build - ${env.BUILD_ID}', to: 'murali.ts@gmail.com'
            emailext body: '''$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:
							
                            Check console output at $BUILD_URL to view the results.''', recipientProviders: [requestor()], subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: ''
          
          
        }
        success {
            echo 'I succeeeded!'
           emailext body: '''$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:
							
                            Check console output at $BUILD_URL to view the results.''', recipientProviders: [developers()], subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: ''
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed'
           emailext body: '''$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:
							
                            Check console output at $BUILD_URL to view the results.''', recipientProviders: [culprits()],subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: ''
        }
        changed {
            echo 'Things were different before...'
        }
    } 
}
