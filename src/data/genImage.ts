export interface Props {
  slug: string;
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
}

export type GenImage = Props;
