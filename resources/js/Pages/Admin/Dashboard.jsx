import Layout from "@/Layouts/layout/layout";
import { Head } from "@inertiajs/react";
import { Card } from "primereact/card";

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            <Layout>
                <Card title="Simple Card">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Inventore sed consequuntur error repudiandae
                        numquam deserunt quisquam repellat libero asperiores
                        earum nam nobis, culpa ratione quam perferendis esse,
                        cupiditate neque quas!
                    </p>
                </Card>
            </Layout>
        </>
    );
}
