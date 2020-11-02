const core = require("@actions/core");
const HttpClient = require("@actions/http-client");

const inputs = [
  "appToken",
  "content",
  "summary",
  "contentType",
  "topicIds",
  "uids",
  "url",
  "wxPusherUrl",
];

async function run() {
  const options = inputs.reduce((res, k) => (res[k] = core.getInput(k)), {});
  console.debug("options:", options);
  if (!options.appToken) {
    core.setFailed("缺少 appToken");
    return;
  }
  if (!options.topicIds && !options.uids) {
    core.setFailed("缺少 topicIds 或 uids");
    return;
  }
  const { appToken, summary, content, contentType, url, wxPusherUrl } = options;
  const topicIds = options.topicIds.split(/[,，]/);
  const uids = options.uids.split(/[,，]/);
  try {
    const httpClient = new HttpClient("Github Action", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await httpClient.post(
      wxPusherUrl,
      JSON.stringify({
        appToken,
        summary: encodeURIComponent(summary),
        content,
        topicIds,
        uids,
        contentType,
        url,
      })
    );
    const body = await res.readBody();
    core.setOutput("response", body);
    //=> 'https://cats.com/unicorn'
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
