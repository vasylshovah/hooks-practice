import React, {useContext, useEffect} from "react";
import {GithubContext} from "../context/github/githubContext";
import {Link} from "react-router-dom";
import {Repos} from "../components/Repos";

export const Profile = ({match}) => {
    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
    const urlName = match.params.name

    useEffect(() => {
        getUser(urlName)
        getRepos(urlName)
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    const {
        name, company, avatar_url,
        location, bio, blog,
        login, html_url, followers,
        public_repos, public_gists
    } = user

    return (
        <>
            <Link to="/" className="btn btn-link">To Homepage</Link>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img
                                src={avatar_url}
                                alt={name}
                                style={{width: "150px"}}
                            />
                            <h1>{name}</h1>
                            {location && <p>Location: {location}</p>}
                        </div>
                        <div className="col">
                            {
                                bio && <>
                                    <h3>BIO</h3>
                                    <p>{bio}</p>
                                </>
                            }
                            <a
                                href={html_url}
                                className="btn btn-dark"
                                target="_blank"
                                rel="noreferrer"
                            >Open profile</a>
                            <ul>
                                {login && <li>
                                    <strong>Username: </strong>{login}
                                </li>}
                                {company && <li>
                                    <strong>Company: </strong>{company}
                                </li>}
                                {blog && <li>
                                    <strong>Blog: </strong>{blog}
                                </li>}
                            </ul>
                            <div className="badge bg-primary">Followers: {followers}</div>
                            <div className="badge bg-success">Repos: {public_repos}</div>
                            <div className="badge bg-info">Gists: {public_gists}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Repos repos={repos} />
        </>
    )
}