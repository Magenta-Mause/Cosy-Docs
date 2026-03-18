export function LandingFooter() {
  return (
    <footer className="bg-button-secondary-default h-fit border-t-3">
      <div className="mx-2 px-4 py-8 pb-4 text-sm">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <h5 className="text-sm">COSY by MedalHeads</h5>
            <p className="mt-2 max-w-md text-muted-foreground">
              COSY stands for Cost Optimised Server Yard. A simplified, cost-efficient self-hosting
              service for running game servers.
            </p>
          </div>

          <div className="text-muted-foreground space-y-1 flex gap-16">
            <div className="flex flex-col">
              <span>Contact:</span>
              <span>jabbekeipert@gmail.com</span>
              <span>+49 160 92422210</span>
            </div>
            <div className="flex flex-col text-end">
              <span>Janne Keipert</span>
              <span>Marchlewskistr 102</span>
              <span>10243 Berlin</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
