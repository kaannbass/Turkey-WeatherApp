"use client"
import Card from "@/Components/Card"
import Container from "@/Components/Container"
import { URL } from "@/Config"
import axios from "axios"
import { useState } from "react"
import Layout from '@/Components/Layout'
import TurkeyMap from "@/Components/TurkeyMap"


export default function Home() {
    const [data, setData] = useState<any[]>([]);
    const handleSearchSubmit = (cityName: string) => {
        try {
          axios.get(URL + 'data/2.5/weather', {
            params: {
              q: cityName,
              units: 'metric',
              appid: process.env.NEXT_PUBLIC_API_Key
            }
          }).then((res) => {
            const newData = [res.data];
            setData(newData);
          });
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    function convertUnixTimestampToHHMM(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    return (
        <Layout>
            <Container>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 p-1">
                            <TurkeyMap onCityClick={handleSearchSubmit} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:flex lg:justify-center item-center w-full sm:w-1/2 p-4 justify-center items-center">
                        {data && (
                            data.map((item) => (
                                <div className="p-4 flex justify-center" key={item.id}>
                                    <Card
                                        temp={Math.ceil(item.main.temp)}
                                        temp_max={Math.ceil(item.main.temp_max)}
                                        temp_min={Math.ceil(item.main.temp_min)}
                                        humidity={Math.ceil(item.main.humidity)}
                                        visibility={item.visibility / 1000}
                                        name={item.name}
                                        icon={item.weather[0].icon}
                                        country={item.sys.country}
                                        sunrise={convertUnixTimestampToHHMM(item.sys.sunrise)}
                                        sunset={convertUnixTimestampToHHMM(item.sys.sunset)}
                                        description={item.weather[0].description}
                                        speed={item.wind.speed}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Container>
        </Layout >
    );
}
