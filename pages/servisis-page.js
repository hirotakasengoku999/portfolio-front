import Layout from "../components/Layout"
import { getAllServicesData } from "../lib/posts";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}app/Service/`

const Servisis = ({ staticServices }) => {
    const {data: services, mutate} = useSWR(apiUrl, fetcher, {
        fallbackData: staticServices
    });
    const filteredServices = services?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    useEffect(() => {
        mutate();
    }, []);
    return (
        <Layout title="service">
            {filteredServices && filteredServices.map((service) => <><a href={service.url} target="brank"><div className="max-w-lg rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                <img className="object-cover" src={service.img} />
                    <div className="font-bold text-xl text-gray-500 mb-2">
                        {service.title}
                    </div>
                    <p className="text-gray-700 text-base">
                    {service.info}
                    </p>
                </div>
                </div></a></>)}
        </Layout>
  )
}

export default Servisis;

export async function getStaticProps() {
    const staticServices = await getAllServicesData();
    return {
        props: { staticServices },
        revalidate: 3,
    };
}