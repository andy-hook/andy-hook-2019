import React from "react"
import styled from "styled-components"
import { SocialItem } from "../../types"
import Icon from "../icon/icon"
import classNames from "classnames"
import {
  borderRadius,
  easing,
  duration,
  borderThickness,
} from "../../style/variables"

import { siteVisibleAction, setTestStringAction } from "../../store/actions"
import { Store } from "../../store/types"

import { Dispatch } from "redux"

import { connect } from "react-redux"

const mapStateToProps = ({ testString }: Store) => {
  return {
    testString,
  }
}

let test = "0"

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    increment: () => {
      console.log("test")
      test = test + "1"
      dispatch(siteVisibleAction(false))
      dispatch(setTestStringAction(test))
    },
  }
}

interface Props {
  items: SocialItem[]
  className?: string
}

interface DispatchProps {
  increment: () => void
}

type AllProps = Props & Partial<Store> & DispatchProps

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const Link = styled.a`
  position: relative;
  display: block;
  color: #fff;

  padding: 0.75em;

  &:not(:last-child) {
    margin-right: 0.3em;
  }

  &::after {
    transition: transform ${duration.slow} ${easing("subtleBounce")},
      opacity ${duration.fast} linear;

    content: "";
    position: absolute;

    top: 0.1em;
    left: 0.1em;
    right: 0.1em;
    bottom: 0.1em;
    border: ${borderThickness.regular} solid #fff;

    border-radius: ${borderRadius.circle};

    opacity: 0;

    transform: scale(1.5);

    pointer-events: none;
  }

  &:focus {
    outline: none;
  }

  &:hover::after,
  &:focus::after {
    opacity: 0.15;
    transform: scale(1);
  }
`
const StyledIcon = styled(Icon)`
  transition: opacity ${duration.slow} ${easing("subtleBounce")};
  opacity: 0.25;

  ${Link}:hover &,
  ${Link}:focus & {
    opacity: 1;
  }
`

const Social: React.FunctionComponent<AllProps> = ({
  items,
  className,
  increment,
  testString,
}) => {
  const icons = items.map((item, key) => (
    <Link key={key.toString()} target="_blank" onClick={increment}>
      {testString}
      <StyledIcon name={item.node.label} />
    </Link>
  ))

  return <Container className={classNames("", className)}>{icons}</Container>
}

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Social)

export default ConnectedCounter

// export default Social
