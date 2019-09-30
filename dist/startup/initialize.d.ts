import { AuthoritarianConfig, AuthoritarianOptions } from "../system/interfaces.js";
/**
 * Prepare all of the options for the start routine
 * - use the simpler config to decide how to start
 * - create microservice instances
 * - otherwise provide mock instances
 */
export declare function initialize(config: AuthoritarianConfig): Promise<AuthoritarianOptions>;
