package Tagil07.ArtSystem;

import Tagil07.ReportSystem.Report;
import Tagil07.ArtSystem.ElementCountVisitor;
import Tagil07.ArtSystem.ShortPrintVisitor;
import Tagil07.ArtSystem.TotalAreaVisitor;
import Tagil07.ArtSystem.LongPrintVisitor;
import Tagil07.ReportSystem.ReportFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

import static java.util.stream.Collectors.toMap;

public class Main {

    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Choose from the following options:\n" +
                "a: Art\n" +
                "r: Reports");
        String choice = scanner.nextLine();
        if (choice.equals("a")){
            artMenu(scanner);
        }
        if (choice.equals("r")){
            reportsMenu(scanner);
        }
    }
    public static Painting readElementDetails(String path) throws IOException {
        Painting painting = new Painting();
        Map<String, Element> files = new HashMap();

        Files.lines(Paths.get(path))
                .map(str -> ElementDetailsFactory.getPaintingElement(str))
                .forEach(e-> painting.addElement(e));
        return painting;
    }
    public static void artMenu(Scanner scanner) throws IOException {
        System.out.println("Enter the path of the painting description");
        String path=scanner.nextLine();
        Painting root= readElementDetails(path);
        System.out.println("Choose from the following options:\n" +
                "q: quit\n" +
                "c: count elements\n" +
                "lp: long print\n" +
                "sh: short print\n" +
                "ta: total area");
        String myString;
        while (!(myString = scanner.nextLine()).equals("q")) {
            switch (myString) {
                case "c":
                    ElementCountVisitor countVisitor = new ElementCountVisitor();
                    root.accept(countVisitor);
                    System.out.println(countVisitor.getCount());
                    break;
                case "sh":
                    ShortPrintVisitor shortPrintVisitor = new ShortPrintVisitor();
                    root.accept(shortPrintVisitor);
                    System.out.print(shortPrintVisitor.getResult());
                    break;
                case "ta":
                    TotalAreaVisitor areaVisitor = new TotalAreaVisitor();
                    root.accept(areaVisitor);
                    System.out.println(areaVisitor.getTotalArea());
                    break;
                case "lp":
                    LongPrintVisitor longPrintVisitor = new LongPrintVisitor();
                    root.accept(longPrintVisitor);
                    System.out.println(longPrintVisitor.getResult());
                    break;
            }
        }
    }

    public static void reportsMenu(Scanner sc){
        System.out.println("Choose report type:");
        System.out.println("1 - Incident");
        System.out.println("2 - Movement");
        System.out.println("3 - Contact");
        System.out.println("4 - Routine");

        String type = sc.nextLine().trim();
        System.out.println("Enter the report content:");
        String content = sc.nextLine();
        System.out.println("Add decorators one by one (enter code). Type 's' to submit and print the report:");
        System.out.println("u - Urgent ([URGENT] at the start)");
        System.out.println("c - Classified ([CLASSIFIED] at the end)");
        System.out.println("t - To Commander ([TO COMMANDER] at the end)");
        System.out.println("a - Audio Attachment ([AUDIO ATTACHED] at the end)");

        java.util.List<String> decorators = new java.util.ArrayList<>();
        while (true) {
            String dec = sc.nextLine().trim();
            if (dec.equals("s")) break;
            if (dec.matches("[ucta]")) {
                decorators.add(dec);
            }
        }
        Report report = Tagil07.ReportSystem.ReportFactory.createReport(type, content, decorators);
        if (report != null)
            System.out.println(report.getContent());
        else
            System.out.println("Report construction failed. Check implementation.");
    }
}
