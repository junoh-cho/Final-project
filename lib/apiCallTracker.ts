
let apiCallCount = 0;

export function incrementApiCall(source: string) {
    apiCallCount++;
    console.log(`[API TRACKER] Call #${apiCallCount} from ${source}`);
}

export function getApiCallCount() {
    return apiCallCount;
}