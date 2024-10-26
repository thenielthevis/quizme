    import React from 'react';

    const Science = () => {
        return (
            <div>
                <main className="content">
                    <section className="intro">
                        <h2>What is Science?</h2>
                        <p>
                            Science is the study of the natural world. It helps us understand how things work
                            through observation and experimentation.
                        </p>
                    </section>

                    <section className="topics">
                        <h2>Topics We Cover</h2>
                        <div className="topic-cards">
                            <div className="topic-card">
                                <h3>Biology</h3>
                                <p>
                                    Learn about living organisms, their structures, functions, and how they
                                    interact with their environment.
                                </p>
                                <button className="learn-more">Learn More</button>
                            </div>
                            <div className="topic-card">
                                <h3>Physics</h3>
                                <p>
                                    Discover the laws of motion, energy, and the fundamental forces of nature.
                                </p>
                                <button className="learn-more">Learn More</button>
                            </div>
                            <div className="topic-card">
                                <h3>Chemistry</h3>
                                <p>
                                    Explore the substances that make up our world and how they interact with one
                                    another.
                                </p>
                                <button className="learn-more">Learn More</button>
                            </div>
                            <div className="topic-card">
                                <h3>Earth Science</h3>
                                <p>
                                    Understand our planet, its processes, and how we can protect our environment.
                                </p>
                                <button className="learn-more">Learn More</button>
                            </div>
                        </div>
                    </section>

                    <section className="fun-facts">
                        <h2>Fun Science Facts!</h2>
                        <ul>
                            <li>Did you know that water can exist in three states: solid, liquid, and gas?</li>
                            <li>The Earth is about 4.5 billion years old!</li>
                            <li>Lightning is hotter than the surface of the sun!</li>
                            <li>A day on Venus is longer than a year on Venus!</li>
                        </ul>
                    </section>
                </main>
            </div>
        );
    };

    export default Science;
