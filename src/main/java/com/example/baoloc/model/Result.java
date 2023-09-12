package com.example.baoloc.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "results")
public class Result {

    protected Result() {
    }

    public Result(int first, int second, int third, int fourth, int fifth,
            int sixth,
            int seventh, int eighth, int ninth) {
        // this.id = id;
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
        this.fifth = fifth;
        this.sixth = sixth;
        this.seventh = seventh;
        this.eighth = eighth;
        this.ninth = ninth;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "first")
    private int first;

    @Column(name = "second")
    private int second;

    @Column(name = "third")
    private int third;

    @Column(name = "fourth")
    private int fourth;

    @Column(name = "fifth")
    private int fifth;

    @Column(name = "sixth")
    private int sixth;

    @Column(name = "seventh")
    private int seventh;

    @Column(name = "eighth")
    private int eighth;

    @Column(name = "ninth")
    private int ninth;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getFirst() {
        return first;
    }

    public int getSecond() {
        return second;
    }

    public int getThird() {
        return third;
    }

    public int getFourth() {
        return fourth;
    }

    public int getFifth() {
        return fifth;
    }

    public int getSixth() {
        return sixth;
    }

    public int getSeventh() {
        return seventh;
    }

    public int getEighth() {
        return eighth;
    }

    public int getNinth() {
        return ninth;
    }

    @Override
    public String toString() {
        return "Result [id=" + id + ", first=" + first + ", second=" + second + ", third=" + third + ", fourth="
                + fourth + ", fifth=" + fifth + ", sixth=" + sixth + ", seventh=" + seventh + ", eighth=" + eighth
                + ", ninth=" + ninth + "]";
    }

    public int[] toIntArray() {
        return new int[] { first, second, third, fourth, fifth, sixth, seventh, eighth, ninth };
    }
}
