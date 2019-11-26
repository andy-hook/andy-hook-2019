import React, { memo, MutableRefObject, useEffect } from "react"
import { SocialMeta, Projects } from "model"
import { TweenMax, Expo } from "gsap"
import useDeferredRunEffect from "@hooks/deferred-run"
import ProjectListComponent from "./project-list/project-list"
import { useMediaQueryContext } from "../media-query-provider/media-query-provider"
import * as S from "./menu.style"
import Social from "./social/social"
import MenuNavList from "./menu-nav-list/menu-nav-list"

interface Props {
  open: boolean
  dispatchCloseMenuAction: () => void
}

interface DataProps {
  social: SocialMeta
  projects: Projects
}

type AllProps = Props & DataProps

export let menuIsAnimating = false
export let menuIsRouteTransitioning = false

const slideInSpeed = 0.6
const slideOutSpeed = 0.3

const Menu: React.FunctionComponent<AllProps> = memo(
  ({ open, projects, social, dispatchCloseMenuAction }) => {
    const sidebar = React.useRef() as MutableRefObject<HTMLDivElement>
    const containerRef = React.useRef() as MutableRefObject<HTMLDivElement>
    const animationScrim = React.useRef() as MutableRefObject<HTMLDivElement>
    const { topPalm } = useMediaQueryContext()

    const handleMenuClose = () => {
      if (!menuIsAnimating) {
        dispatchCloseMenuAction()
      }
    }

    const animateOpen = () => {
      menuIsAnimating = true

      TweenMax.set(containerRef.current, { visibility: "visible" })

      TweenMax.fromTo(
        sidebar.current,
        slideInSpeed,
        {
          opacity: 1,
          x: topPalm ? "-100%" : "100%",
        },
        {
          ease: Expo.easeOut,
          x: "0%",
          onComplete: () => {
            menuIsAnimating = false
          },
        }
      )

      // Scrim
      TweenMax.to(animationScrim.current, 0.25, {
        opacity: slideInSpeed,
      })
    }

    const animateClose = () => {
      menuIsAnimating = true

      TweenMax.fromTo(
        sidebar.current,
        slideOutSpeed,
        {
          x: "0%",
        },
        {
          ease: Expo.easeOut,
          x: topPalm ? "-100%" : "100%",
          clearProps: "transform, opacity",
          onComplete: () => {
            menuIsAnimating = false

            TweenMax.set(containerRef.current, { clearProps: "visibility" })
          },
        }
      )

      // Scrim
      TweenMax.to(animationScrim.current, slideOutSpeed, {
        opacity: 0,
        clearProps: "opacity",
      })
    }

    useDeferredRunEffect(() => {
      open ? animateOpen() : animateClose()
    }, [open])

    return (
      <S.Fixer ref={containerRef}>
        <S.Sidebar ref={sidebar}>
          <S.Contents>
            <S.SidebarNav>
              <S.SidebarNavInner>
                <ProjectListComponent
                  projects={projects}
                  onClick={handleMenuClose}
                  open={open}
                />

                <MenuNavList onClick={handleMenuClose} open={open} />
              </S.SidebarNavInner>
            </S.SidebarNav>

            <S.SocialContainer>
              <Social items={social} />
            </S.SocialContainer>
          </S.Contents>
        </S.Sidebar>

        <S.AnimationScrim ref={animationScrim} onClick={handleMenuClose} />
      </S.Fixer>
    )
  }
)

export default Menu
