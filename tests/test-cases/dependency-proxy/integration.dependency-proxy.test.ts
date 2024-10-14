import {WriteStreamsMock} from "../../../src/write-streams";
import {handler} from "../../../src/handler";
import {initSpawnSpy} from "../../mocks/utils.mock";
import {WhenStatics} from "../../mocks/when-statics";
import {cleanupJobResources, Job} from "../../../src/job";

let jobs: Job[] = [];

describe("dependency-proxy", () => {
    beforeEach(() => {
        jobs = [];
        initSpawnSpy(WhenStatics.all);
    });

    afterEach(async () => {
        await cleanupJobResources(jobs);
    });

    test("should attempt to pull the correct image", async () => {
        const writeStreams = new WriteStreamsMock();

        try {
            await handler({
                cwd: "tests/test-cases/dependency-proxy",
            }, writeStreams, jobs);
        } catch (e: any) {
            expect(e.shortMessage).toEqual("Command failed with exit code 1: docker pull gitlab.com:443/gcl/dependency_proxy/containers/busybox:latest");
            return;
        }
        throw new Error("Error is expected but not thrown/caught");

    });

});
