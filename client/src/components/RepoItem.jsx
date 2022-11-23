import React from 'react';

const RepoItem = (props) => (
  <div>
    <div>{props.repo.username}</div>
    <div>{props.repo.name}</div>
  </div>
)

export default RepoItem