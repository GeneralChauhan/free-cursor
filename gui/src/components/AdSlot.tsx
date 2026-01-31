import { useAppSelector } from "../redux/hooks";

const AD_SLOT_HEIGHT = 90;

/**
 * Renders an ad slot (iframe to a hosted AdSense page) only when AI is
 * generating (isStreaming) and config enables it with a valid URL.
 * Use config.ui.showAdsDuringGeneration and config.ui.adsSlotUrl.
 */
export function AdSlot() {
  const isStreaming = useAppSelector((state) => state.session.isStreaming);
  const showAdsDuringGeneration = useAppSelector(
    (state) => state.config.config.ui?.showAdsDuringGeneration,
  );
  const adsSlotUrl = useAppSelector(
    (state) => state.config.config.ui?.adsSlotUrl,
  );

  if (
    !isStreaming ||
    !showAdsDuringGeneration ||
    !adsSlotUrl ||
    typeof adsSlotUrl !== "string" ||
    adsSlotUrl.trim() === ""
  ) {
    return null;
  }

  return (
    <div
      className="flex w-full flex-shrink-0 items-center justify-center overflow-hidden bg-vsc-input-background"
      style={{ minHeight: AD_SLOT_HEIGHT, maxHeight: AD_SLOT_HEIGHT }}
      data-testid="ad-slot"
    >
      <iframe
        src={adsSlotUrl}
        title="Ad"
        sandbox="allow-scripts allow-same-origin"
        className="border-0"
        style={{
          width: "100%",
          minHeight: AD_SLOT_HEIGHT,
          maxHeight: AD_SLOT_HEIGHT,
        }}
      />
    </div>
  );
}
