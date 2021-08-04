import React, {useContext, useState} from "react";
import {AlertContext} from "../context/alert/alertContext";
import {GithubContext} from "../context/github/githubContext";

export const Search = () => {
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const github = useContext(GithubContext)

    const onSubmit = e => {
        if (e.key !== 'Enter') {
            return
        }
        github.clearUsers()

        if (value.trim()) {
            alert.hide()
            github.search(value.trim())
        } else {
            alert.show('type correct data')
        }
    }
    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Type nickname of client..."
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyPress={onSubmit}
            />
        </div>
    )
}