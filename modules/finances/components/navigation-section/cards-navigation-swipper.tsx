'use client'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
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
  const {
    handleAfterInit,
    adjustCardHeights,
    swiperRef,
    isSwiperReady,
    showSwiper,
    isDeepLevel,
    itemsCount,
  } = useCardsNavigationSwiper({
    cardsCount: cardsNavigationInformation.length,
  })

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
        spaceBetween: isDeepLevel ? 32 : 8,
      },
    },
  }

  return (
    <div
      data-slot="container-cards-navigation"
      className={cn(
        'flex w-full flex-row flex-nowrap',
        !showSwiper && 'gap-4 md:gap-6 xl:gap-8',
        itemsCount === 1 && !showSwiper && 'lg:[&>div:nth-of-type(1)]:max-w-[calc(100%/3-24px)]',
        itemsCount === 1 &&
          !showSwiper &&
          'xl:[&>div:nth-of-type(1)]:max-w-[calc(100%/3-32px)] xl:[&>div:nth-of-type(1)]:min-w-[calc(100%/3-32px)]',
      )}
    >
      {showSwiper ? (
        <div
          data-slot="swiper-wrapper"
          className={cn('relative w-full min-w-0 flex-1', '-my-2 py-2')}
        >
          <Swiper
            direction="horizontal"
            modules={[Pagination, Navigation]}
            pagination={true}
            onAfterInit={handleAfterInit}
            onResize={adjustCardHeights}
            onBreakpoint={adjustCardHeights}
            ref={swiperRef}
            className={cn(
              'pb-10!',
              '[&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto',
              '[&_.swiper-pagination-horizontal]:relative [&_.swiper-pagination-horizontal]:mt-6',
              '[&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:w-3',
              '[&_.swiper-pagination-bullet]:md:h-4 [&_.swiper-pagination-bullet]:md:w-4',
              !isSwiperReady && 'hidden!',
            )}
            {...swiperOptions}
          >
            {cardsNavigationInformation.map((card) => (
              <SwiperSlide key={card.code}>
                <div
                  data-slot="card-wrapper"
                  className={cn('box-border flex h-full w-full', 'p-1')}
                >
                  <NavigationCard
                    href={card.href as Route}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    code={card.code}
                    isCompact={isDeepLevel}
                    className="swiper-milestone-card h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-1 gap-6 xl:gap-8">
          {cardsNavigationInformation.map((card) => (
            <NavigationCard
              key={card.code}
              href={card.href as Route}
              image={card.image}
              title={card.title}
              description={card.description}
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
