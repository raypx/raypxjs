import { authFeatures } from "../../features";
import type { SocialOptions } from "../../types";

/**
 * Process social configuration
 * @param config - Social configuration
 * @returns Processed social configuration
 */
export const processSocialConfig = (
  config: SocialOptions | undefined
): SocialOptions | undefined => {
  if (!config) {
    return;
  }

  const enabledProviders = Object.entries(authFeatures.social)
    .filter(([_, enabled]) => enabled)
    .map(([provider]) => provider);

  if (enabledProviders.length === 0) {
    return;
  }

  return {
    ...config,
    providers: config.providers?.filter((p) => enabledProviders.includes(p)),
  };
};
