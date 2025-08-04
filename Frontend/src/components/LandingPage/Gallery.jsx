import React from 'react'

export default function Gallery(){
    const galleryItems = [
        {
            id: 1,
            image: '/seven.jpeg',
            title: 'Hostels For Men',
            description: 'There are 14 blocks allotted for Men of capacity varying from 200 to 1000 students in each block. The total capacity for Men\'s hostel is about 7500.',
            capacity: '7500',
            blocks: '14',
            icon: '🏢'
        },
        {
            id: 2,
            image: '/five.jpeg',
            title: 'Hostels For Women',
            description: 'Modern accommodation facilities designed specifically for women students with enhanced security features and comfortable living spaces.',
            capacity: '5200',
            blocks: '10',
            icon: '🏛️'
        },
        {
            id: 3,
            image: '/six.jpeg',
            title: 'Academic Facilities',
            description: 'State-of-the-art academic buildings equipped with modern technology, laboratories, and research facilities for comprehensive learning.',
            capacity: '12000',
            blocks: '8',
            icon: '🎓'
        }
    ];

    return(
        <div className='min-h-screen bg-gradient-to-br from-black via-[rgb(137,24,26)] to-black py-16 px-4 sm:px-6 lg:px-8'>
            {/* Header Section */}
            <div className='max-w-7xl mx-auto mb-16 text-center'>
                <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                    Campus <span className='text-red-300'>Gallery</span>
                </h2>
                <p className='text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed'>
                    Explore our world-class facilities and infrastructure designed to provide the best educational experience
                </p>
                <div className='mt-8 w-24 h-1 bg-gradient-to-r from-red-300 to-red-500 mx-auto rounded-full'></div>
            </div>

            {/* Gallery Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
                {galleryItems.map((item, index) => (
                    <div key={item.id} className='group relative bg-gray-900/80 backdrop-blur-sm border border-red-900/30 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden'>
                        {/* Image Container */}
                        <div className='relative overflow-hidden rounded-t-2xl'>
                            <div className='aspect-w-16 aspect-h-12 bg-gradient-to-br from-gray-200 to-gray-300'>
                                <img 
                                    src={item.image} 
                                    alt={item.title} style={{height:"250px"}}
                                    className='w-full h-54 object-cover group-hover:scale-110 transition-transform duration-700'
                                />
                                {/* Overlay */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                
                                {/* Icon Badge */}
                                <div className='absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg'>
                                    {item.icon}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className='p-4 space-y-4 bg-black'>
                            <div className='flex items-center justify-between'>
                                <h4 className='text-xl font-bold text-white group-hover:text-red-300 transition-colors duration-300'>
                                    {item.title}
                                </h4>
                            </div>
                            
                            <p className='text-gray-300 leading-relaxed line-clamp-3'>
                                {item.description}
                            </p>

                            {/* Stats */}
                            {/* <div className='flex justify-between items-center pt-4 border-t border-gray-700'>
                                <div className='text-center'>
                                    <div className='text-2xl font-bold text-red-400'>{item.capacity}</div>
                                    <div className='text-sm text-gray-400'>Capacity</div>
                                </div>
                                <div className='w-px h-12 bg-gray-700'></div>
                                <div className='text-center'>
                                    <div className='text-2xl font-bold text-red-400'>{item.blocks}</div>
                                    <div className='text-sm text-gray-400'>Blocks</div>
                                </div>
                            </div> */}

                            {/* CTA Button */}
                            {/* <button className='w-full mt-6 bg-gradient-to-r from-[rgb(137,24,26)] to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
                                Learn More
                                <span className='ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300'>→</span>
                            </button> */}
                        </div>

                        {/* Decorative Element */}
                        <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[rgb(137,24,26)]/10 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500'></div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA Section */}
            <div className='max-w-4xl mx-auto mt-20 text-center  rounded-3xl p-12 shadow-2xl bg-black'>
                <h3 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                    Ready to Explore More?
                </h3>
                <p className='text-xl text-red-100 mb-8 leading-relaxed'>
                    Schedule a campus tour and experience our facilities firsthand
                </p>
                <button className='bg-white text-[rgb(137,24,26)] font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg'>
                    Schedule Tour
                </button>
            </div>
        </div>
    );
}