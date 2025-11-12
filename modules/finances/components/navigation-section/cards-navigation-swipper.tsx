'use client'

import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/shared/lib/utils'
import { NavigationCard } from './navigation-card'
import { useCardsNavigationSwiper } from './use-cards-navigation-swiper'
import type { FiancesNavigationCard } from '../../types'
import type { Route } from 'next'
import type { SwiperOptions } from 'swiper/types'

interface CardsNavigationSwipperProps {
  cardsNavigationInformation: FiancesNavigationCard[]
}

export function CardsNavigationSwipper({
  cardsNavigationInformation,
}: CardsNavigationSwipperProps) {
  const isMobile = useMediaQuery({ to: 'md' })
  const isTabletOrDesktop1024 = useMediaQuery({ from: 'md', to: 'xl' })

  const MAX_ITEMS = isMobile ? 2 : isTabletOrDesktop1024 ? 3 : 5
  const showSwiper = cardsNavigationInformation.length > MAX_ITEMS
  const isDeepLevel = cardsNavigationInformation.length > 6
  const itemsCount = cardsNavigationInformation.length

  const { handleAfterInit, adjustCardHeights, swiperRef, isSwiperReady } = useCardsNavigationSwiper(
    {
      showSwiper,
      cardsCount: itemsCount,
    },
  )

  const swiperOptions: SwiperOptions = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 8,
      },
      640: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 8,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: isDeepLevel ? 4 : 3,
        slidesPerGroup: isDeepLevel ? 4 : 3,
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: isDeepLevel ? 6 : 5,
        slidesPerGroup: isDeepLevel ? 6 : 5,
        spaceBetween: 8,
      },
      1440: {
        slidesPerView: isDeepLevel ? 6 : 5,
        slidesPerGroup: isDeepLevel ? 6 : 5,
        spaceBetween: 8,
      },
    },
  }

  return (
    <div
      data-slot="container-cards-navigation"
      className={cn(
        'flex flex-row flex-nowrap',
        !showSwiper && 'gap-4 md:gap-6 xl:gap-8',
        showSwiper && '-mx-2',
        itemsCount === 1 && !showSwiper && 'lg:[&>div:nth-of-type(1)]:max-w-[calc(100%/3-24px)]',

        itemsCount === 1 &&
          !showSwiper &&
          'xl:[&>div:nth-of-type(1)]:max-w-[calc(100%/3-32px)] xl:[&>div:nth-of-type(1)]:min-w-[calc(100%/3-32px)]',
      )}
    >
      {showSwiper ? (
        <div
          data-slot="swiper-wrapper"
          className={cn(
            'relative w-full',

            isDeepLevel ? '-mx-2 xl:-mx-4' : '-mx-2',
          )}
        >
          <Swiper
            direction="horizontal"
            modules={[Pagination, Navigation]}
            centerInsufficientSlides
            pagination={true}
            onAfterInit={() => {
              handleAfterInit()
            }}
            onResize={() => {
              adjustCardHeights()
            }}
            onBreakpoint={() => {
              adjustCardHeights()
            }}
            ref={swiperRef}
            className={cn(
              'pb-10!',
              '[&_.swiper-slide]:mb-2 [&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto',
              // Pagination styling
              '[&_.swiper-pagination-horizontal]:relative [&_.swiper-pagination-horizontal]:mt-6',
              // Bullet sizing: 12px mobile, 16px tablet+
              '[&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:w-3',
              '[&_.swiper-pagination-bullet]:md:h-4 [&_.swiper-pagination-bullet]:md:w-4',
              // Active slide margin
              '[&_.swiper-slide-active]:-ml-2',
              !isSwiperReady && 'hidden!',
            )}
            {...swiperOptions}
          >
            {cardsNavigationInformation.map((card) => (
              <SwiperSlide key={card.code} className="flex">
                <div
                  data-slot="card-wrapper"
                  className={cn('box-border flex w-full min-w-full', 'pt-1 pb-1 pl-4', 'xl:pl-6')}
                >
                  <NavigationCard
                    href={card.href as Route}
                    image={card.image}
                    title={card.title}
                    description={card.description ?? ''}
                    code={card.code}
                    isCompact={isDeepLevel}
                    className="swiper-milestone-card"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-1 gap-4">
          {cardsNavigationInformation.map((card) => (
            <NavigationCard
              key={card.code}
              href={card.href as Route}
              image={card.image}
              title={card.title}
              description={card.description ?? ''}
              code={card.code}
              isCompact={isDeepLevel}
              className="navigation-card-height"
            />
          ))}
        </div>
      )}
    </div>
  )
}
