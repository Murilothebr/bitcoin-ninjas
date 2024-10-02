function organizeCarsIntoSections(data: Cars[]): { title: string, data: Cars[] }[] {
    const sections: { [key: string]: Cars[] } = {};

    data.forEach(item => {
        const firstLetter = item.brand.toUpperCase();

        if (!sections[firstLetter]) {
            sections[firstLetter] = [];
        }

        sections[firstLetter].push(item);
    });

    const organizedSections = Object.keys(sections).map(letter => ({
        title: letter,
        data: sections[letter]
    }));

    organizedSections.sort((a, b) => a.title.localeCompare(b.title));

    return organizedSections;
}

export default organizeCarsIntoSections;