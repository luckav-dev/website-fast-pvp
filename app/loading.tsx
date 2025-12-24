import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { serverConfig } from '@/lib/config'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/30 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center">
              <LoadingSpinner size="lg" className="text-primary" />
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground mb-2">
            {serverConfig.fullName}
          </p>
          <p className="text-sm text-muted-foreground font-medium animate-pulse">
            Cargando...
          </p>
        </div>
        
        {/* Progress bar animation */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-progress" />
        </div>
      </div>
    </div>
  )
}

