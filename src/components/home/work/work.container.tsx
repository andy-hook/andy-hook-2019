import React, { memo } from "react"
import Work from "./work"
import { TProjects } from "@custom-types/model"

interface Props {
  projectsData: TProjects
}

export type ContainerProps = Props

const WorkContainer: React.FunctionComponent<ContainerProps> = memo(
  ({ projectsData }) => {
    return <Work projectsData={projectsData} />
  }
)

export default WorkContainer
