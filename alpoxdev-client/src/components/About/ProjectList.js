import React from 'react';
import * as styled from './styled';
import { projects } from './projects';

export default function ProjectList() {
    const projectList = projects.map((project, index) => (
        <ProjectItem key={index} project={project} />
    ));

    return (
        <styled.ProjectList>
            
            {projectList}
        </styled.ProjectList>
    );
}

export function ProjectItem({ project }) {
    return (
        <styled.ProjectItem>
            {project.image && <styled.ProjectImage src={project.image} />}

            <styled.ProjectInfo image={project.image ? 'image' : ''}>
                <styled.ProjectLink href={project.link} target="_blank">
                    {project.link}
                </styled.ProjectLink>
                <styled.ProjectTitle>{project.title}</styled.ProjectTitle>
                <styled.ProjectDescription>
                    {project.description}
                </styled.ProjectDescription>
            </styled.ProjectInfo>
        </styled.ProjectItem>
    );
}