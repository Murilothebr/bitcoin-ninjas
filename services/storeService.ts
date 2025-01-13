function organizeStoreIntoSections(data: Store[]): { title: string, data: Store[] }[] {
    const sections: { [key: string]: Store[] } = {};

    data.forEach(item => {

        const firstLetter = item.city?.toUpperCase();

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

export default organizeStoreIntoSections;