'use client'
export const playClick = () => {
    const audio = new Audio('/click.m4a');
    audio.play();
};

export const playVote = () => {
    const audio = new Audio('/vote.m4a');
    audio.play();
};
