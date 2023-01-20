import fs from "fs";
import { execSync } from "child_process";
/*

expects PROJECTROOT/../generated/ui/ to have subfolders like "12312323212" that in turn contain pairs of images (jpeg or png) and json files with same file name.
each subfolder is one session from https://github.com/cmdr2/stable-diffusion-ui (2.5.8 beta)

copies images over to /public/images/generated/ui/$sessionId/$imageSlug.jpeg or png
upscales images there using upscale.exe that should be available in systems path (a dart program I wrote that uses https://replicate.com/nightmareai/real-esrgan binaries for upscaling) 

generates src/data/generated/$sessionId/$sessionId.ts data files for each session

appends exports to src/data/generated/sessions.ts
appends sessions to scripts/sessions_already_imported.txt such that they are not imported again.


*/

const STABLE_DIFFUSION_UI_SAVE_PATH = "../generated/ui";
const STABLE_DIFFUSION_UI_PUBLIC_PATH = "./public/images/generated/ui";
const SESSIONS_DATA_CODE_PATH = "./src/data/generated";
const SESSIONS_ALREADY_IMPORTED_TXT_PATH =
  "scripts/sessions_already_imported.txt";

async function imimport() {
  const sessionsAlreadyImported = fs
    .readFileSync(SESSIONS_ALREADY_IMPORTED_TXT_PATH, "utf-8")
    .split("\n");

  let sessions = fs.readdirSync(STABLE_DIFFUSION_UI_SAVE_PATH);
  let allSessionsToImportDataObject = {};
  let slugsToOriginalFileNamesNoEnding = {};
  let sessionIdToOriginalFolderName = {};
  for (let i = 0; i < sessions.length; i++) {
    const sessionFolderName = sessions[i];
    if (sessionsAlreadyImported.indexOf(sessionFolderName) != -1) {
      continue;
    }

    let sessionId = new Date(parseInt(sessionFolderName))
      .toISOString()
      .split(".")[0]
      .replaceAll("-", "_")
      .replaceAll(":", "_");
    sessionId = `D${sessionId}`;
    sessionIdToOriginalFolderName[sessionId] = sessionFolderName;
    const sessionContents = fs.readdirSync(
      `${STABLE_DIFFUSION_UI_SAVE_PATH}/${sessionFolderName}`
    );
    const sessionContentsJson = sessionContents.filter((e) =>
      e.endsWith(".json")
    );

    allSessionsToImportDataObject[sessionId] = {};

    for (var jsonFileName of sessionContentsJson) {
      const jsonString = fs.readFileSync(
        `${STABLE_DIFFUSION_UI_SAVE_PATH}/${sessionFolderName}/${jsonFileName}`,
        "utf-8"
      );
      const json = JSON.parse(jsonString);
      const jsonFileNameNoEnding = jsonFileName.split(".")[0];
      const genImage = extractGenImageInfoFromJson(json, jsonFileNameNoEnding);
      slugsToOriginalFileNamesNoEnding[genImage.slug] = jsonFileNameNoEnding;
      allSessionsToImportDataObject[sessionId][genImage.slug] = genImage;
    }
  }

  // console.log(allSessionsToImportDataObject);

  for (const sessionId of Object.keys(allSessionsToImportDataObject)) {
    let sessionData = allSessionsToImportDataObject[sessionId];
    const sessionFolderName = sessionIdToOriginalFolderName[sessionId];
    console.log(
      `run import for folder ${sessionFolderName} => ${sessionId}  (${
        Object.keys(sessionData).length
      } images)`
    );
    // copy images over to public folder
    if (!fs.existsSync(`${STABLE_DIFFUSION_UI_PUBLIC_PATH}/${sessionId}`)) {
      fs.mkdirSync(`${STABLE_DIFFUSION_UI_PUBLIC_PATH}/${sessionId}`);
    }
    for (const slug of Object.keys(sessionData)) {
      const fileNameNoEnding = slugsToOriginalFileNamesNoEnding[slug];

      const fullOriginalPathNoEnding = `${STABLE_DIFFUSION_UI_SAVE_PATH}/${sessionFolderName}/${fileNameNoEnding}`;
      const jpgExists = fs.existsSync(`${fullOriginalPathNoEnding}.jpeg`);
      if (jpgExists) {
        fs.copyFileSync(
          `${fullOriginalPathNoEnding}.jpeg`,
          `${STABLE_DIFFUSION_UI_PUBLIC_PATH}/${sessionId}/${slug}.jpeg`
        );
        allSessionsToImportDataObject[sessionId][slug].file_type = "jpeg";
      } else {
        const pngExists = fs.existsSync(fullOriginalPathNoEnding + ".png");
        if (pngExists) {
          fs.copyFileSync(
            `${fullOriginalPathNoEnding}.png`,
            `${STABLE_DIFFUSION_UI_PUBLIC_PATH}/${sessionId}/${slug}.png`
          );
          allSessionsToImportDataObject[sessionId][slug].file_type = "png";
        } else {
          console.error(`no image file found for: ${fullOriginalPathNoEnding}`);
          continue;
        }
      }
      // upscale the image:
      const fileType = allSessionsToImportDataObject[sessionId][slug].file_type;
      const imageFilePathInPublic = `${STABLE_DIFFUSION_UI_PUBLIC_PATH}/${sessionId}/${slug}.${fileType}`;
      upscaleImage(imageFilePathInPublic);
    }
    // generate type file for each session:
    const sessionsDataCodePath = `${SESSIONS_DATA_CODE_PATH}/${sessionId}`;
    if (!fs.existsSync(sessionsDataCodePath)) {
      fs.mkdirSync(sessionsDataCodePath);
    }

    fs.writeFileSync(
      `${sessionsDataCodePath}/${sessionId}.ts`,
      `import { Session } from "./../../genImage";
export const __${sessionId} = ${JSON.stringify(sessionData)};`
    );

    const allSessionsFileAppendix = `
import { __${sessionId} } from "./${sessionId}/${sessionId}";
export const ${sessionId}: typeof __${sessionId} & gen.Session = __${sessionId};`;

    fs.appendFileSync(
      `${SESSIONS_DATA_CODE_PATH}/sessions.ts`,
      allSessionsFileAppendix,
      "utf-8"
    );
    fs.appendFileSync(
      SESSIONS_ALREADY_IMPORTED_TXT_PATH,
      `${sessionFolderName}\n`,
      "utf-8"
    );
  }
}
imimport();

function extractGenImageInfoFromJson(json, fileNameNoEnding) {
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
  let slugSplit = fileNameNoEnding.split("_");
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

function upscaleImage(image_path) {
  console.log(`   ...upscaling ${image_path}`);
  const image_path_for_processing = image_path.startsWith("./")
    ? image_path.substring(2)
    : image_path;
  let r = execSync(`upscale.exe ${image_path_for_processing}`);
  console.log(r.toString());
}
