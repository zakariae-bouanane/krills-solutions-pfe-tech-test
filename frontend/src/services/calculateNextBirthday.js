//! Calculate the next birthday date from a given date of birth.
const calculateNextBirthday = (dateOfBirthString) => {
    if (!dateOfBirthString) return 'Date missing';

    const dob = new Date(dateOfBirthString);
    const today = new Date();

    let nextBirthday = new Date(
        today.getFullYear(),
        dob.getMonth(),
        dob.getDate()
    );

    // checking for next birthddays only and not past ones
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const display = nextBirthday.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    const yyyy = nextBirthday.getFullYear();
    const mm = String(nextBirthday.getMonth() + 1).padStart(2, '0');
    const dd = String(nextBirthday.getDate()).padStart(2, '0');

    return {
        display,
        sortKey: `${yyyy}-${mm}-${dd}`,
    };
};

export default calculateNextBirthday;
