export interface Props {
  slug: string;
  session: string;
  prompt: string;
  negative_prompt: string;
  guidance_scale: number;
  prompt_strength: number;
  seed: number;
  width: number;
  height: number;
  num_inference_steps: number;
  sampler_name: string;
  stable_diffusion_model: string;
  file_type: string;
}

export type GenImage = Props;

export type Session = Record<string, GenImage>;

import * as __SESSIONS from "./generated/sessions";
export const SESSIONS = __SESSIONS;
