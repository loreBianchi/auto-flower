import figlet from 'figlet';
import chalk from 'chalk';

export function printFiglet(text: string) {
  const ascii = figlet.textSync(text, {
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });
  console.log(chalk.cyanBright(ascii));
}

export function printHeader() {
  const header = figlet.textSync('Prisma CLI', {
    font: 'Slant',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });
  console.log(chalk.cyanBright(header));
}
