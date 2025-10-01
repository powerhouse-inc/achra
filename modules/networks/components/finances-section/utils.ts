import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import type { BarChartSeries, RevenueAndSpendingRecords } from '../card-bar-chart/types'

const tooltipLabels: Record<string, string> = {
  psm: 'PSM',
  liquidationIncome: 'Liquidation Income',
  fees: 'Fees',
  daiSpent: 'DAI Spent',
  mkrVesting: 'MKR Vesting',
  dsr: 'DSR',
}

export const getCorrectLabelForToolTip = (label: string): string => tooltipLabels[label] || ''

export const createTooltipFormatter =
  (isMobile: boolean) => (params: BarChartSeries[] | BarChartSeries) => {
    const gap = 8
    const isArray = Array.isArray(params)
    const shortAmount = isArray ? params.length > 10 : false
    const flexDirection = shortAmount ? 'row' : 'column'

    if (isArray) {
      if (params.every((item) => item.value === 0)) return ''

      const noZeroValues = params.filter((item) => item.value !== 0)

      return `
  <div style="background-color:var(--popover);box-shadow:'none'
  };padding:8px 16px;min-width:194px;overflow:auto;border-radius:12px; font-family:Inter ,sans-serif">
    <div style="margin-bottom:8px;font-size:16px;font-weight:600;color:var(--color-muted-foreground)";line-height:24px;>${noZeroValues[0]?.name}</div>
    <div style="display:flex;flex-direction:${flexDirection};gap:${gap}px;min-width:194px;max-width:450px;flex-wrap:wrap;">
      ${noZeroValues
        .reverse()
        .map(
          (item) =>
            `<div style="display: flex;align-items:center;gap: 4px">
          <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
            isMobile ? 13 : 16
          }" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
          </svg>
          <span style="font-size:14px;font-weight:600;line-height:22px;color:var(--color-muted-foreground);max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"> ${getCorrectLabelForToolTip(
            item.seriesName,
          )}:</span>
          <span style="font-size:14px;margin-left:4px;font-weight:600;line-height:22px;color:var(--color-foreground)">${usLocalizedNumber(item.value, 2)}</span>
        </div>`,
        )
        .join('')}
    </div>
  </div>
  `
    } else {
      return `
    <div style="background-color:var(--popover);box-shadow:'none'
    };box-shadow:'none'
    };padding:8px 16px;min-width:194px;overflow:auto;border-radius:12px;font-family:Inter, sans-serif">
      <div style="display:flex;flex-direction:column;gap:8px;min-width:194px;max-width:450px;">
        
        <div style="display: flex;justify-content: space-between;align-items: center">  
          <div style="display:flex;align-items:center"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
              isMobile ? 13 : 16
            }" viewBox="0 0 13 13" fill="none">
                 <circle cx="6.5" cy="6.5" r="4" fill="${params.color}" />
           </svg>
            <span style="font-size:14px;font-weight:600;line-height:22px;color:var(--color-muted-foreground);
            };max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${getCorrectLabelForToolTip(
              params.seriesName,
            )}:</span>
          </div>

          <span style="font-size:14px;font-weight:600;line-height:22px;color:var(--color-muted-foreground);
          };">30%</span>
        </div>

        <div style="display: flex;justify-content: space-between;align-items: center">  
          <div style="display:flex;align-items:center">
            <span style="font-size:14px;font-weight:600;line-height:22px;color:var(--color-muted-foreground);max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Total:</span>
          </div>
          <div style="font-size:14px;font-weight:600;line-height:22px;color:var(--color-muted-foreground);
          };">${usLocalizedNumber(params.value, 2)}</div>
        </div>

      </div>
    </div>
  `
    }
  }

export const formatNumberToShortScale = (num: number, isShowNegative = false) => {
  // Need to be sure that its negative
  const isNegative = num < 0
  const mathAbsolute = Math.abs(num)

  let result

  if (mathAbsolute < 1000) {
    result = mathAbsolute.toString()
  } else if (mathAbsolute < 1000000) {
    result = `${(mathAbsolute / 1000).toFixed(1).replace(/\.?0+$/g, '')}K`
  } else if (mathAbsolute < 1000000000) {
    result = `${(mathAbsolute / 1000000).toFixed(1).replace(/\.?0+$/g, '')}M`
  } else if (mathAbsolute < 1000000000000) {
    result = `${(mathAbsolute / 1000000000).toFixed(1).replace(/\.?0+$/g, '')}B`
  } else if (mathAbsolute < 1000000000000000) {
    result = `${(mathAbsolute / 1000000000000).toFixed(1).replace(/\.?0+$/g, '')}T`
  } else {
    result = mathAbsolute.toString()
  }

  return isShowNegative && isNegative ? `-${result}` : result
}

export const getYearsForChart = (revenueAndSpendingData: RevenueAndSpendingRecords) =>
  Object.keys(revenueAndSpendingData)
    // limit the years to 2021-2024 as there's no UI space for more years
    .filter((year) => Number(year) >= 2021 && Number(year) <= 2024)
    .sort((a, b) => Number(a) - Number(b))

export const barChartSeriesConfig = [
  { key: 'psm', stack: 'revenue', color: '#4FC86F', radius: 0 },
  { key: 'liquidationIncome', stack: 'revenue', color: '#7AD693', radius: 0 },
  { key: 'fees', stack: 'revenue', color: '#A6E3B6', radius: [8, 8, 0, 0] },
  { key: 'dsr', stack: 'spending', color: '#FFA132', radius: 0 },
  { key: 'mkrVesting', stack: 'spending', color: '#F07B72', radius: 0 },
  { key: 'daiSpent', stack: 'spending', color: '#F4A19A', radius: [8, 8, 0, 0] },
]
