/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The configuration for the API Example.
 * <instanceid> -  replace in the API and Aggregator URLs with the value from the IoT4I service URL
 * <password> - read from the IoT4I Service Credentials page
 */
 var config = module.exports = {
 	api: "https://iot4insurance-api-e302e1ff-1823-4e7d-8eaa-f556c89bbf22.mybluemix.net",
 	aggregator: "https://iot4i-aggregator-<instanceid>.mybluemix.net",
 	credentials : {
 		user: "Admin",
 		pass: "d64e4a12-a706-46ef-942e-f35dc15a67f6"
 	}
 };
