'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWalletUi } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PortfolioData {
  balance: number
  tokens: TokenInfo[]
  totalValue: number
}

interface TokenInfo {
  mint: string
  amount: string
  decimals: number
  symbol?: string
}

export function PortfolioDashboard() {
  const { account, cluster } = useWalletUi()
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    balance: 0,
    tokens: [],
    totalValue: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const fetchPortfolioData = useCallback(async () => {
    if (!account) return

    setIsLoading(true)
    setError('')

    try {
      const mockData = {
        balance: 2500000000,
        tokens: [
          { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: '1000000', decimals: 6, symbol: 'USDC' },
          { mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', amount: '500000000', decimals: 6, symbol: 'USDT' },
        ],
      }

      const newPortfolio = {
        balance: mockData.balance,
        tokens: mockData.tokens,
        totalValue: 0,
      }

      setPortfolio(newPortfolio)
    } catch (error) {
      console.error('Portfolio fetch error:', error)
      setError('Failed to fetch portfolio data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [account])

  useEffect(() => {
    if (account) {
      fetchPortfolioData()
    }
  }, [account, fetchPortfolioData])

  const calculateTotalValue = () => {
    return portfolio.tokens.reduce((total, token) => {
      const amount = parseFloat(token.amount) / Math.pow(10, token.decimals)
      return total + amount
    }, 0)
  }

  const formatBalance = (balance: number) => {
    const solBalance = balance / 1e9
    return solBalance.toFixed(4)
  }

  const formatTokenAmount = (amount: string, decimals: number) => {
    const numAmount = parseFloat(amount) / Math.pow(10, decimals)
    return numAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })
  }

  if (!account) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">Portfolio Dashboard</h1>
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-lg md:text-xl font-semibold text-amber-800 dark:text-amber-200 text-center">
            🔗 Please connect your Solana wallet to view your portfolio
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">My Portfolio Dashboard</h1>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">SOL Balance</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-lg">Loading...</div>
            ) : (
              <div>
                <p className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {formatBalance(portfolio.balance)} SOL
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Network: {cluster.label}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Token Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            {portfolio.tokens.length === 0 ? (
              <p className="text-lg text-gray-500 dark:text-gray-400">No tokens found</p>
            ) : (
              <div className="space-y-3">
                {portfolio.tokens.map((token, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0"
                  >
                    <div>
                      <span className="text-lg font-medium">{token.symbol || 'Unknown'}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
                        {token.mint.slice(0, 8)}...{token.mint.slice(-8)}
                      </p>
                    </div>
                    <span className="text-lg font-mono">{formatTokenAmount(token.amount, token.decimals)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
              ${calculateTotalValue().toFixed(2)}
            </p>
            <Button
              onClick={fetchPortfolioData}
              disabled={isLoading}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
