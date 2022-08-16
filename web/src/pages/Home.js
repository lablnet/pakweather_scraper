import React from 'react';
import CitySelector from '../components/CitySelector';

class Home extends React.Component {
    componentDidMount() {
        document.title = "Pakistan Weather"
    }
    render() {

        return (
            <div className="mb-8">
                <section className="">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="text-center mb-20">
                            <h1
                                className="sm:text-3xl text-2xl font-medium text-center title-font mb-4"
                            >
                                Type your city name below.
                            </h1>
                            <div className='col-span-1'>
                                <CitySelector />
                            </div>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-6">
                                Choose from list.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
