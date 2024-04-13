﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Reservations.Data;

#nullable disable

namespace Reservations.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Reservations.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Reservations.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Reservations.Models.FootballField", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("GovernorateId")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("PhoneNumbr")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ReservationBlockId")
                        .HasColumnType("int");

                    b.Property<int>("ReservationStatusId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("GovernorateId");

                    b.HasIndex("ReservationBlockId");

                    b.HasIndex("ReservationStatusId");

                    b.ToTable("FootballFields");
                });

            modelBuilder.Entity("Reservations.Models.Governorate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Governorates");
                });

            modelBuilder.Entity("Reservations.Models.Like", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("Reservations.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("FootballFieldId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FootballFieldId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Reservations.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("FootballFieldId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FootballFieldId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("Reservations.Models.ReservationBlock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BlockAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OpenAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ReservationsBlock");
                });

            modelBuilder.Entity("Reservations.Models.ReservationStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CloseAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OpenAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ReservationsStatus");
                });

            modelBuilder.Entity("Reservations.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("PhoneNumbr")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Reservations.Models.UserField", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("FieldId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "FieldId");

                    b.HasIndex("FieldId");

                    b.ToTable("UserFields");
                });

            modelBuilder.Entity("Reservations.Models.View", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Views");
                });

            modelBuilder.Entity("Reservations.Models.Comment", b =>
                {
                    b.HasOne("Reservations.Models.Post", "Post")
                        .WithMany("comments")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.User", "User")
                        .WithMany("comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Reservations.Models.FootballField", b =>
                {
                    b.HasOne("Reservations.Models.Category", "Category")
                        .WithMany("FootballFields")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.Governorate", "Governorate")
                        .WithMany("FootballFields")
                        .HasForeignKey("GovernorateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.ReservationBlock", "ReservationBlock")
                        .WithMany("FootballFields")
                        .HasForeignKey("ReservationBlockId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.ReservationStatus", "ReservationStatus")
                        .WithMany("FootballFields")
                        .HasForeignKey("ReservationStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Governorate");

                    b.Navigation("ReservationBlock");

                    b.Navigation("ReservationStatus");
                });

            modelBuilder.Entity("Reservations.Models.Like", b =>
                {
                    b.HasOne("Reservations.Models.Post", "Post")
                        .WithMany("Likes")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.User", "User")
                        .WithMany("Likes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Reservations.Models.Post", b =>
                {
                    b.HasOne("Reservations.Models.FootballField", "FootballField")
                        .WithMany("Posts")
                        .HasForeignKey("FootballFieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FootballField");
                });

            modelBuilder.Entity("Reservations.Models.Reservation", b =>
                {
                    b.HasOne("Reservations.Models.FootballField", "FootballField")
                        .WithMany("Reservations")
                        .HasForeignKey("FootballFieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.User", "User")
                        .WithMany("Reservations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FootballField");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Reservations.Models.UserField", b =>
                {
                    b.HasOne("Reservations.Models.FootballField", "FootballField")
                        .WithMany("UserFields")
                        .HasForeignKey("FieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.User", "User")
                        .WithMany("UserFields")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FootballField");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Reservations.Models.View", b =>
                {
                    b.HasOne("Reservations.Models.Post", "Post")
                        .WithMany("views")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Reservations.Models.User", "User")
                        .WithMany("views")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Reservations.Models.Category", b =>
                {
                    b.Navigation("FootballFields");
                });

            modelBuilder.Entity("Reservations.Models.FootballField", b =>
                {
                    b.Navigation("Posts");

                    b.Navigation("Reservations");

                    b.Navigation("UserFields");
                });

            modelBuilder.Entity("Reservations.Models.Governorate", b =>
                {
                    b.Navigation("FootballFields");
                });

            modelBuilder.Entity("Reservations.Models.Post", b =>
                {
                    b.Navigation("Likes");

                    b.Navigation("comments");

                    b.Navigation("views");
                });

            modelBuilder.Entity("Reservations.Models.ReservationBlock", b =>
                {
                    b.Navigation("FootballFields");
                });

            modelBuilder.Entity("Reservations.Models.ReservationStatus", b =>
                {
                    b.Navigation("FootballFields");
                });

            modelBuilder.Entity("Reservations.Models.User", b =>
                {
                    b.Navigation("Likes");

                    b.Navigation("Reservations");

                    b.Navigation("UserFields");

                    b.Navigation("comments");

                    b.Navigation("views");
                });
#pragma warning restore 612, 618
        }
    }
}
