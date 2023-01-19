import fs from "fs";

const STABLE_DIFFUSION_UI_SAVE_PATH = "../generated/ui";
async function generateImagesTypes() {
  const sessionsAlreadyImported = fs
    .readFileSync("scripts/sessions_already_imported.txt", "utf-8")
    .split("\n");

  let sessions = fs.readdirSync(STABLE_DIFFUSION_UI_SAVE_PATH);
  for (let i = 0; i < sessions.length; i++) {
    const sess = sessions[i];
    if (sessionsAlreadyImported.indexOf(sess) != -1) {
      continue;
    }

    let sessionId = new Date(parseInt(sess))
      .toISOString()
      .split(".")[0]
      .replaceAll("-", "_")
      .replaceAll(":", "_");
    const sessionContents = fs.readdirSync(
      `${STABLE_DIFFUSION_UI_SAVE_PATH}/${sess}`
    );
    const sessionContentsJson = sessionContents.filter((e) =>
      e.endsWith(".json")
    );

    for (var jsonFileName of sessionContentsJson) {
      const jsonString = fs.readFileSync(
        `${STABLE_DIFFUSION_UI_SAVE_PATH}/${sess}/${jsonFileName}`,
        "utf-8"
      );
      const json = JSON.parse(jsonString);
      const genImage = extractGenImageInfoFromJson(
        json,
        jsonFileName.split(".")[0]
      );
    }
  }
}
generateImagesTypes();

function extractGenImageInfoFromJson(json, fileName) {
  const use_stable_diffusion_model_split =
    json.use_stable_diffusion_model.split("\\");
  let stable_diffusion_model =
    use_stable_diffusion_model_split[
      use_stable_diffusion_model_split.length - 1
    ].split(".")[0];

  let constructedJson = {
    prompt: json.prompt,
    negative_prompt: json.negative_prompt,
    guidance_scale: json.guidance_scale,
    prompt_strength: json.prompt_strength,
    seed: json.seed,
    width: json.width,
    height: json.height,
    num_inference_steps: json.num_inference_steps,
    sampler_name: json.sampler_name,
    stable_diffusion_model,
  };
  let slugSplit = fileName.split("_");
  let slug = slugSplit
    .slice(0, slugSplit.length - 1)
    .filter((e) => e)
    .join("_");
  slug = `${slug}_${json.seed}_${json.width}x${json.height}_s${
    json.num_inference_steps
  }_g${json.guidance_scale}_p${
    json.prompt_strength
  }_${stable_diffusion_model}_${Math.abs(
    hashCode(json.negative_prompt + json.sampler_name)
  )}`
    .replaceAll(".", "")
    .replaceAll("-", "_");
  constructedJson.slug = slug;
  return constructedJson;
}

function hashCode(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
