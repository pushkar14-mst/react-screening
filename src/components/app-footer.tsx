import React from 'react'

export function AppFooter() {
  return (
    <footer className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 text-purple-700 dark:text-purple-300 text-sm border-t border-purple-200 dark:border-purple-800">
      <div className="flex items-center justify-center gap-2">
        <span>Powered by</span>
        <span className="font-bold text-purple-600 dark:text-purple-400">Third Time</span>
        <span>•</span>
        <a
          className="link hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
          href="https://github.com/solana-developers/create-solana-dapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solana DApp
        </a>
      </div>
    </footer>
  )
}
