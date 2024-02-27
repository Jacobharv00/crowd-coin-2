import React, { Component } from "react";
import { Button, Card, Grid } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = props.query.address
            ? await Campaign(props.query.address)
            : null;
        const summary = await campaign?.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary ? summary[0] : 0,
            balance: summary ? Number(summary[1]) : 0,
            requestsCount: summary ? summary[2] : 0,
            approversCount: summary ? summary[3] : 0,
            manager: summary ? summary[4] : 0,
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money.",
                style: { overflowWrap: "break-word" },
            },
            {
                header: Number(minimumContribution),
                meta: "Minimum Contribution (wei)",
                description:
                    "You must contribute at least this much wei to become an approver.",
            },
            {
                header: Number(requestsCount),
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
            },
            {
                header: Number(approversCount),
                meta: "Number of Approvers",
                description:
                    "Number of people who have already donated to this campaign.",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description:
                    "The balance is how much money this campaign has left to spend.",
            },
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link
                                route={`/campaigns/${this.props.address}/requests`}
                                legacyBehavior
                            >
                                <a>
                                    <Button
                                        style={{
                                            backgroundColor: "purple",
                                            color: "white",
                                        }}
                                    >
                                        View Requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}
export default CampaignShow;
