import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default function Header() {
    return (
        <Menu
            color="purple"
            style={{
                marginTop: "10px",
                borderBottomColor: "purple",
                padding: 6,
            }}
        >
            <Link route="/" legacyBehavior>
                <a className="item">CrowdCoin</a>
            </Link>

            <Menu.Menu position="right">
                <Link route="/" legacyBehavior>
                    <a className="item">Campaigns</a>
                </Link>
                <Link route="/campaigns/new" legacyBehavior>
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}
