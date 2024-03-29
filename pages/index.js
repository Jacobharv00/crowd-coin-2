import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";

import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map((address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`} legacyBehavior>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true,
                color: "purple",
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new" legacyBehavior>
                        <a>
                            <Button
                                content="Create Campaign"
                                icon="add circle"
                                floated="right"
                                style={{
                                    backgroundColor: "purple",
                                    color: "white",
                                }}
                            />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;
