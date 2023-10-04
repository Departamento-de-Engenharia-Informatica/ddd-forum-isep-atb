/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 * Ver exemplo: https://github.com/abrahamberg/mock-typescript-class-sample/tree/main
*/
/** for mocking axios in jest */
/* jest.mock('./restClient/RestClient'); */
import axios, { AxiosResponse } from "axios";
import RestClient from "./restClient/RestClient";
/*jest.mock('restClient/RestClient'); */
// const mockRestClient = jest.genMockFromModule()
//const mockedAxios = axios as jest.Mocked<typeof axios>;
/** for mocking axios in jest */

import { Logger } from "tslog";
import ConfigHandler from "./config/ConfigHandler";

import Users from "./endpoints/Users";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let users: Users;

let accessToken: string;
let refreshToken: string;

describe("Users endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    
    log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  it("Post - Create User", async (): Promise<void> => {
    // Given
    //Prepare the response we want to get from axios
    const expectedResponse: AxiosResponse = {
      data: "",
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    /*const mockedRestClient = axios as jest.Mocked<typeof axios>;

    mockedAxios.post.mockResolvedValueOnce(expectedResponse);*/
 
    // When
    const response = await users.post();

    // Then
    expect(axios.post).toHaveBeenCalled();
    expect(response.status).toBe(expectedResponse.status);    
  });

  it("Post Login", async (): Promise<void> => {
    const response = await users.postLogin();
    expect(response.status).toBe(200);
    
    
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("Get Me", async (): Promise<void> => {
    log.debug("Access token: " + accessToken);

    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);
    
    
    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("atb");
  });  
});