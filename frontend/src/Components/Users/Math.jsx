import React from 'react';

const Math = () => {
    return (
        <div>
            <main className="content">
                <section className="intro">
                    <h2>What is Math?</h2>
                    <p>
                        Mathematics is the study of numbers, shapes, and patterns. It helps us solve problems 
                        and understand the world around us.
                    </p>
                </section>

                <section className="topics">
                    <h2>Topics We Cover</h2>
                    <div className="topic-cards">
                        <div className="topic-card">
                            <h3>Arithmetic</h3>
                            <p>
                                Learn the basics of addition, subtraction, multiplication, and division.
                            </p>
                            <button className="learn-more">Learn More</button>
                        </div>
                        <div className="topic-card">
                            <h3>Geometry</h3>
                            <p>
                                Discover the properties of shapes and the relationships between them.
                            </p>
                            <button className="learn-more">Learn More</button>
                        </div>
                        <div className="topic-card">
                            <h3>Fractions</h3>
                            <p>
                                Understand how to work with parts of a whole and how to compare them.
                            </p>
                            <button className="learn-more">Learn More</button>
                        </div>
                        <div className="topic-card">
                            <h3>Measurement</h3>
                            <p>
                                Explore how to measure length, weight, volume, and time.
                            </p>
                            <button className="learn-more">Learn More</button>
                        </div>
                    </div>
                </section>

                <section className="fun-facts">
                    <h2>Fun Math Facts!</h2>
                    <ul>
                        <li>Did you know that zero is the only number that cannot be represented by Roman numerals?</li>
                        <li>There are infinitely many prime numbers!</li>
                        <li>A triangle has three sides, and the sum of its angles is always 180 degrees!</li>
                        <li>Math is used in cooking, architecture, and even video games!</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Math;
